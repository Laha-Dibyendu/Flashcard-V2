import baseUrl from './config.js'

const signin = {
  template:
    `<div>

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

        <div>
            <h2>
                Sign in to start learning
            </h2>

        </div>
        <div style="text-align:center;">
            <form action="">
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email"
                            required v-model="formData.email" />
                    </div>
                </div>
                <br>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="Password"
                            name="pasw" required v-model="formData.password" />
                    </div>
                </div>
                <br>
                <div class="form-group row" style="margin-left: 165px;">
                    <div class="col-sm-10">
                        <button class="btn btn-primary" @click.prevent="loginUser"> Sign in</button>
                    </div>
                </div>

            </form>
        </div>
        <br>
        <div>
            <h5>New User ? <router-link to="/register">
                    <a>

                        Register Here

                    </a>
                </router-link>
            </h5>
        </div>
    </div>
    <div class="mt-5 p-4 bg-dark text-white text-center">
        <p>To know more read the <a href="getting-started.pdf" download="New_file_name">Guide book</a></p>
        <p>Dibyendu Laha | 2020 Batch | copyright, 2021 | All rights reserved by the owner.</p>
    </div>
</div>
</div>`,
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async loginUser() {
      // let res = await fetch((baseUrl + '/api/student')
      // let getStudentData = await res.json()

      const res = await fetch('/login?include_auth_token', {
        method: 'post',
      // const res = await fetch(`/api/student`,{       // ' /login?include_auth_token', {
      //   method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(this.formData)
        
      })
      // if (!res.ok) {
      //   console.log('something went wrong bitch')
      // }
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        localStorage.setItem(
          'auth_token',
          data.response.user.authentication_token
        )
        this.$router.push('/dashboard/1')
      // return data
        }
        else {
          console.log('something went wrong')
        }
    },
  }
}

export default signin