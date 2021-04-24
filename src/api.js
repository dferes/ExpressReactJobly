import axios from "axios";
import cloneDeep from 'lodash/cloneDeep';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static setToken = (token_) => this.token = token_;

  static getToken = () => this.token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.getToken()}` };
    // const params = (method === "get")
    //     ? data
    //     : {};
    const params = data;
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Individual API routes


  /** Checks user's username and the password passed with the 
   * form data and, if valid, returns a token signed with jwt.
   * The payload is the username and password.
   * Note that the token is also updated in this class.
   */ 
  static async logIn(formData) {
    const { username, password } = formData;
    const data = {
      username: username,
      password: password
    };
 
    let res = await this.request(
      'auth/token', 
      data,
      'post'
    );
    
    this.setToken(res.token);
    return res.token;
  }

   /** If all data passed in formData is valid, a new user is created
    *  and added to the database (the user table). A token is created 
    *  and signed with jwt. The payload is the username and password.
    *  Note that the token is also updated in this class. 
   */ 
  static async signup(formData){
    const { username, password, firstName, lastName, email } = formData; // why did I do this?? Just pass formData...
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName, 
      email: email
    };

    let res = await this.request(
      'auth/register',
      data,
      'post'
    );

    this.setToken(res.token);  
    return res.token;
  }

  /** Accepts { username, firstname, lastName, email, password }
   *  and can update { firstName, lastName, email } in the database
   *  and will return { firstName, lastName, email }. Only username
   *  and password are required.
   */ 
  static async update(formData) { // rename this to updateUser
    const { username, password } = formData;
 
    await this.request( // Verify the password is correct before updating user
      'auth/token', 
      { username: username, password: password },
      'post'
    );

    const data = cloneDeep(formData);
    delete data.username;
    delete data.password;
      
    let res = await this.request(
      `users/${formData.username}`, 
      data,
      'patch'
    );
      
    return res.user;
  }

  static async applyToJob(username, jobId) {
    let res = await this.request(
      `users/${username}/jobs/${jobId}`,
      { username: username, id: jobId },
      'post'
    );

    return res.applied;
  }


  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on either all companies or companies 
   *  that have a similar name to data.name **/
  static async getAllCompanies(data={}) {
    let res = await this.request('companies/', data);
    return res.companies;
  }


  /** Get details on a job by id */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get details on either all jobs or jobs 
  *  that have a similar title to data.title **/
  static async getAllJobs(data={}) {
    let res = await this.request('jobs/', data);
    return res.jobs;
  }

  /** Get details on a user by username */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
 

}


export default JoblyApi;