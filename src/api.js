import axios from "axios";

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
    const headers = { Authorization: `Bearer ${this.token}` };
    // const params = (method === "get") // wtf is this here?
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

  static async signup(formData){
    const { username, password, firstName, lastName, email } = formData;
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