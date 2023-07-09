import baseUrl from './config.js'

const decks = {
  template:
    `<div>
    <div class="bg2" style="background-color:#011047;">
    <div class="p-3 mb-2 bg-dark text-white" style="padding: 0.8rem!important;">
        <h1 style="text-align: left;">Hi ,</h1>
        <h5 style="text-align: left;">Here you can see all the decks you have till now.</h5>
    </div>
</div>


<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active">
                    <h4>Deck</h4>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
                    aria-expanded="false" aria-controls="multiCollapseExample1" onclick="func()">
                    <h4>Add Deck</h4>
                </a>
                <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body" style="
                      flex: 1 1 auto;
                      padding-top: 13px;
                      padding-right: 30px;
                      padding-left: 30px;
                      padding-bottom: 11px;margin-right: 0px;
                      margin-left: 70px;
                      ">
                                <form id="deck" style="visibility: hidden;" method="post">
                                    <label for="dname"><b>Deck Name</b></label>
                                    <input type="text" placeholder="Enter Deck Name" name="dname" required
                                        style="width: 126px;">
                                    <br><br>
                                    <button type="submit">Add</button>
                                    <button type="button"><a style="text-decoration: none;">Cancel</a></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link">
                    <h4>Go Back</h4>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="/logout">
                    <h4>Log Out</h4>
                </a>
            </li>

        </ul>
    </div>
</nav>


<div class="container mt-5">
    <!--  -->
    <!-- <h2>Deck</h2>
</div>
<div>
    <a href="/logout">Log Out</a>
</div>
<div>
    <a >Go Back</a>
</div>
<hr> -->
    <div style="
    width: 1297px;
    height: 724px;
    background-image: url('/static/5591276.jpg');
      background-repeat: no-repeat;
      background-attachment: fixed; 
      background-size: 100% 100%; background-attachment: scroll;">
        
        <span v-if="deckss.jojo==true">

        
        <span v-for="item in deckss.items">
            
        <div class="card" style="padding-bottom: 30px; width: 9cm; height: 18cm; display : flex;flex-direction:column; float: left; margin-left: 80px; margin-bottom: 20px;">
            <div class="containers" style="padding: 2px 1px;">
               <h3 id="t1"><b id="c" >{{ item["title"] }}</b></h3>
                <h4>Score: </h4>
                <h4> Last visited:

                {{ item["last_rev"] }}
                
                
                </h4>

                <p id="p1"><a>View cards </a></p>
                <p id="p1"><a>Start Quiz </a></p>
                <button onclick="reply_click()">Add Card</button><br><br>



                <form style="visibility: hidden;" method="post">
                    <label for="cname"><b>Card Front</b></label>
                    <input type="text" placeholder="Enter front description" name="front" required>
                    <br><br>
                    <label for="bname"><b>Card Back</b></label>
                    <input type="text" placeholder="Enter back description" name="back" required>
                    <br><br>

                    <button type="submit"> Submit </button>
                </form>
            </div>
            <br>
            <div id="bc">
            <form id="ff" style="visibility: hidden" method="POST">
                <label for="cname1"><b>Deck New name</b></label>
                <input type="text" placeholder="Enter Deck name" name="frontd" required v-model="DeckData.title">
                <br><br>


                <button type="submit"  @click.prevent="onSubmitdeck">submit</button>
            </form>

            <form style="visibility: hidden;" method="post">
                <label for="dname3"><b>Are you Sure ? You want to delete the Deck.</b></label>
                <!-- <input type="text" placeholder="Enter Deck Name" name="dname3" required> -->
                <br><br>
                <button type="submit">Delete</button>
                <!-- <button type="button"><a href="" style="text-decoration: none;">Cancel</a></button><br><br> -->
            </form><br>
            <button class="btn1 warning" data-bs-toggle="collapse" id="c" type="submit" name="click" value="Edit" onclick="func1(this.id)">Edit</button>
            <button class="btn1 success" type="submit" name="click" value="delete"
                onclick="func2(this.id)">Delete</button>

            <button class="btn1 info" type="submit" name="click" value="cancel"><a
                    style="text-decoration: none;">Cancel</a></button>
            </div>
        </div>
          
        <br><br>

 
</span>
</span>
<span v-else>
                <br>
                <h3><b>You have no Decks to start with. Add Decks to Begin.</b></h3>
</span>
        
    </div>
    </div>
    </div>`,
    data: function() {
        return { deckss:
            {
                ID:0,
                jojo: false,
                items:[]
            },
            DeckData: {
                title: '',
            }
    }
    },
    methods:{
        async onSubmitdeck() {
            const createStudentRequest = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}/{{DeckData.title}}`, {
                method: 'PUT',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(this.DeckData),
            })
            console.log(createStudentRequest)
            if (createStudentRequest.ok) {
                alert('Deck updated successfully')
                const data = await createStudentRequest.json()
                console.log(data)
                document.getElementById("bc").style.visibility="hidden";
                this.$router.push(`/decks/${this.$route.params.id}`)
                // localStorage.setItem("jwt-token",data.token);
                // this.$router.push('/')
            } else {
                let errorMessage = await createStudentRequest.json()
                this.error = errorMessage.message
            }
        },
    },

  

    async mounted() {
        // const token = localStorage.getItem('jwt-token');
        // console.log(token) 
        let res = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}`,{
            method: "GET",
        } )
        //console.log(res)
        let data=await res.json()
        console.log(data)
        // console.log(token+"HULLLLLLLLLLLAAAAAAAA")
        if (res.ok) {
            this.deckss.jojo=true
            this.deckss.items=data
            console.log(this.deckss.items)
        } else if (res.status == 401) {
            this.success = false
            this.error = data.response.error
        } else {
            this.success = false
            this.error = data.message
        }
        
    // }


}
}

    export default decks
