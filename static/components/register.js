import baseUrl from '../components/config.js'

const register = {
    template: `
    <div>


    <div class="bg2" style="background-color:#011047;">
        <div class="p-3 mb-2 bg-dark text-white" style="padding: 0.8rem!important;">
            <h1>Welcome to Laha's Application on Flash card</h1>
        </div>
    </div>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <router-link to="/" style="text-decoration: none;">
                        <a class="nav-link active" href="">
                            <h4>
                                Home
                            </h4>
                        </a>
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/signin" style="text-decoration: none;">
                        <a class="nav-link active">
                            <h4>
                                Sign in
                            </h4>
                        </a>
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/register" style="text-decoration: none;">
                        <a class="nav-link active">
                            <h4>
                                Register
                            </h4>
                        </a>
                    </router-link>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="getting-started.pdf">
                        <h4>Guide book</h4>
                    </a>
                </li>



            </ul>
        </div>
    </nav>



    <div class="container mt-5" style="
    width: 1944px;
    height: 724px;
    background-image: url('/static/gg.png');
      background-repeat: no-repeat;
      background-attachment: fixed; 
      background-size: 100% 100%; background-attachment: scroll;">

        <h1>Register</h1>
        <p>Please create an account to begin your journey with us.</p>
        <p>After Registration please go to Sign in and login to your account</p>
        <hr>

        <h2 id="t" style="display: none; border: 3px solid green; "></h2>
        <form action="/register" method="post">

            <div class="row">
                <div class="col">
                    <label for="f_name"><b>First Name</b></label>
                    <input type="text" class="form-control" placeholder="First name" name="f_name" required
                        style="margin-bottom: 10px;" v-model='formData.f_name'>
                </div>
                <div class="col">
                    <label for="l_name"><b>Last Name</b></label>
                    <input type="text" class="form-control" placeholder="Last name" style="margin-bottom: 10px;"
                        name="l_name" required v-model='formData.l_name'>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="email"><b>Email</b></label>
                    <input type="email" class="form-control" placeholder="Email" style="margin-bottom: 10px;"
                        name="email" required v-model='formData.email'>
                </div>
                <div class="col">
                    <label for="psw"><b>Password</b></label>
                    <input type="password" class="form-control" placeholder="password" style="margin-bottom: 10px;"
                        name="psw" required v-model='formData.password'>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                        spaces, special characters, or emoji.
                    </small>
                </div>
                <div class="col">
                    <label for="psw-repeat"><b>Re-type Password</b></label>
                    <input type="password" class="form-control" placeholder="Re-enter password"
                        style="margin-bottom: 10px;" name="psw-repeat" required>
                </div>
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck" style="margin-left: -67em;">
                        Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div>
            </div>

            <div class="col-sm-10" style="margin-left: 120px;">
                <button type="submit" class="btn btn-success" @click.prevent="onSubmit">Register</button>
                <button type="button" class="btn btn-warning"><a href="/"
                        style="text-decoration: none; color: rgb(0, 0, 0);"><b>Cancel</b></a></button>
            </div>
        </form>

        <br>
        <br>
        <div>
            <h5><b>Already have an account ? </b>
                <router-link to="/signin">
                    Sign in
                </router-link>
            </h5>
        </div>
    </div>
</div>`
,
data: function () {
  return {
    formData: {
      f_name: '',
      l_name: '',
      email: '',
      password:'',
    },
    error: false,
  }
},
methods: {
  // once the form is submitted send the form data to the server
  // if request was successful alert with success message
  // else print the error message
  async onSubmit() {
    const createStudentRequest = await fetch(`http://127.0.0.1:8080/api/student`, {
      method: 'POST',
      body: JSON.stringify(this.formData),
      headers: new Headers({ 'content-type': 'application/json' }),
    })

    if (createStudentRequest.ok) {
      alert('User created successfully')
      const data = await createStudentRequest.json()
      // console.log(data.token)
      // localStorage.setItem("jwt-token",data.token);
      this.$router.push('/')
    } else {
      let errorMessage = await createStudentRequest.json()
      this.error = errorMessage.message
    }
  },
},
}

export default register