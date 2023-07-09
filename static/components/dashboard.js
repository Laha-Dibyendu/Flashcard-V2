import baseUrl from "./config.js";

const dashboard = {
    template: `<div>

    <div class="bg2" style="background-color:#011047;">
        <div class="p-3 mb-2 bg-dark text-white" style="padding: 0.8rem!important;">
            <h1 style="text-align: left;">Hi {{profile.f_name}},</h1>
        </div>
    </div>


    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active">
                        <h4>Dashboard</h4>
                    </a>
                </li>


                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1" onclick="func()">
                        <h4>Add Deck</h4>
                    </a>

                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body">
                                <form id="deck" style="visibility: hidden;" method="post">
                                    <label for="dname"><b>Deck Name</b></label>
                                    <input type="text" placeholder="Enter Deck Name"  required
                                        v-model='DeckData.title'>
                                    <br><br>
                                    <button type="submit" @click.prevent="onSubmitdeck">Add</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>

                </li>

                <li class="nav-item">
                <router-link to="" style="text-decoration: none;">
                          <a class="nav-link active" @click.prevent="Todecks"> 
                                <h4>
                                View Your Decks
                                </h4>
                            </a>
                        </router-link>    
                
                
                </li>

                <li class="nav-item">
                    <a class="nav-link" onclick="func2()" data-bs-toggle="collapse" href="#multiCollapseExample2"
                        role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                        <h4>Delete deck</h4>
                    </a>
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <div class="card card-body">
                                <form id="deletedeck" style="visibility: hidden;" method="post">
                                    <label for="dname1"><b>Deck Name</b></label>
                                    <input type="text" placeholder="Enter Deck Name" name="dname1" required v-model='DeckData.title'>
                                    <br><br>
                                    <button type="submit"  @click.prevent="onSubmitdel">Delete</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </li>

                





                <li class="nav-item">
                    <a class="nav-link" onclick="func3()" data-bs-toggle="collapse" href="#multiCollapseExample3"
                        role="button" aria-expanded="false" aria-controls="multiCollapseExample3">
                        <h4>Delete Account</h4>
                    </a>
                    <div class="row">
                        <div class="col">
                            <div class="collapse multi-collapse" id="multiCollapseExample3">
                                <div class="card card-body">
                                    <form id="deleteacc" style="visibility: hidden;" method="post">
                                        <label for="dname3"><b>Are you Sure ? all your data will be deleted.</b></label>
                                        <br><br>
                                        <button type="submit" onclick="func4()">Delete</button>
                                        <button type="button"><a style="text-decoration: none;">Cancel</a></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="getting-started.pdf">
                        <h4>Guide book</h4>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" @click.prevent="logout" style="float: right; margin-right: 20px; font-size: 27.5px;">
                        Log Out
                    </a>
                </li>

            </ul>
        </div>
    </nav>


    <div class="container mt-5" style="
          width: 1944px;
          height: 724px;
          background-image: url('/static/5591276.jpg');
            background-repeat: no-repeat;
            background-attachment: fixed; 
            background-size: 100% 100%; background-attachment: scroll;">

        <div><br><br>

            <br><br>
            <!-- {% if dash %} -->
            <table style="margin-left: 280px;height: 100px;width: 750px;">
                <tr>
                    <th>Deck Name</th>
                    <th>Last Visited</th>
                    <th>Deck Score (out of 10)</th>
                </tr>

                <!-- {% for elem in dash %}
            <tr>
                <td> {{elem[0]}} </td>
                <td>{% if elem[1]|float > 1 %}
                    {{elem[1]}}{{" days ago"}}
                
                {% elif elem[1]==None %}
                    {{"Not visited "}}   
                        
                {% else %}
                    {{ "%.1f"|format(elem[1]*24|float)}}{{" hours ago"}}
                {% endif %}</td>
                <td>{{elem[2]}}</td>
            </tr>
            <!-- {% endfor %}-->
            </table>
            <!-- {% else %}-->
            <br>
            <h3><b>No Decks available to show.</b></h3>
            <!-- {% endif %} -->
            <!-- <div style="text-align: center;">
            <a  >See Your Decks</a>
        </div> -->

        </div>











    </div>
    <!--144112782381-->

</div>`,
    data: function () {
        return {
            profile: {
                f_name: 'Abhisek',
                email: 'narendra@gmail.com',
            },

            success: true,
            error: 'Something went wrong from dasjboard',
            deck: {
                title: "",
            },


            DeckData: {
                title: '',
            },
            error: false,
        // all students
            // students: false,
            // // filtered students
            // filteredStudents: false,
            // // string which is base of the filtering
            // filterString: null,
                
              }
            },
        
    



    methods: {
        async logout() {
            const res = await fetch('/logout')
            if (res.ok) {
                localStorage.clear()
                this.$router.push('/')
            } else {
                console.log('could not logout the user')
            }
        },
        async Todecks(){
            // // let res = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}` )
            // async created() {
                let getStudentRequest = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}`)
                let getStudentData = await getStudentRequest.json()
            
                // if request was successful change the studedents by the response data
                // else alerts with the error message
                if (getStudentRequest.ok) {
                //   this.students = getStudentData
                //   this.filteredStudents = getStudentData
                  this.$router.push(`/decks/${this.$route.params.id}`)
                } else {
                  alert(getStudentData.message)
                }
              },
            
            //console.log(res)
            
            // console.log(token+"HULLLLLLLLLLLAAAAAAAA")
            // if (res.ok) {
            //     this.$router.push(`/decks/${this.$route.params.id}`)
            // } else if (res.status == 401) {
            //     this.success = false
            //     this.error = res.response.error
            // } else {
            //     this.success = false
            //     this.error = res.message
            // }
        

        async onSubmitdeck() {
            const createStudentRequest = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}`, {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(this.DeckData),
            })
            console.log(createStudentRequest)
            if (createStudentRequest.ok) {
                alert('Deck created successfully')
                const data = await createStudentRequest.json()
                console.log(data)
                //document.getElementById("deck").style.visibility="hidden";
                this.$router.push(`/dashboard/${this.$route.params.id}`)
                // localStorage.setItem("jwt-token",data.token);
                // this.$router.push('/')
            } else {
                let errorMessage = await createStudentRequest.json()
                this.error = errorMessage.message
            }
        },


        async onSubmitdel() {
            const createStudentRequest = await fetch(`http://127.0.0.1:8080/api/courses/1`, {
                method: 'DELETE',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(this.DeckData),
            })
            console.log(createStudentRequest)
            if (createStudentRequest.ok) {
                alert('Deck deleted successfully')
                // const data = await createStudentRequest.json()
                // console.log(data)
                //document.getElementById("deck").style.visibility="hidden";
                this.$router.push(`/dashboard/${this.$route.params.id}`)
                // localStorage.setItem("jwt-token",data.token);
                // this.$router.push('/')
            } else {
                let errorMessage = await createStudentRequest.json()
                this.error = errorMessage.message
            }
        }
    },

    async mounted() {
        let c =`${this.$route.params.id}`
        // const token = localStorage.getItem('jwt-token');
        // console.log(token) 
        const res = await fetch(baseUrl + `/api/student/1`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authentication-Token': "undefined",
                'Authentication-Token': localStorage.getItem('auth_token')
                // 'Authorization': 'Bearer '+token,
                //   'WyI4MzI1YThmNjc3NzE0MTdlYWNiOTQ1YmI3OTg2OTExNCJd.YhTcgg.hu9X8B-RDH_v_FXNscFiuie-IoM',
            },
        })
        //console.log(res)
        const data = await res.json()
        console.log(data)
        // console.log(token+"HULLLLLLLLLLLAAAAAAAA")
        if (res.ok) {
            this.profile.f_name = data.f_name;
        } else if (res.status == 401) {
            this.success = false
            this.error = data.response.error
        } else {
            this.success = false
            this.error = data.message
        }
        
    },
}



export default dashboard