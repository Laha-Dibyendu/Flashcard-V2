const home = {
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
            width: 1297px;
            height: 724px;
            background-image: url('/static/gg.png');
            background-repeat: no-repeat;
            background-attachment: fixed; 
            background-size: 100% 100%; background-attachment: scroll;">
            <br>
            <div id="main">
                <ul>
                    <h3>This is an app you can use to memorize things easily.</h3>
                    <h3>To get started please log in first.</h3>
                    <h3>If you are new to this application you have to register first.</h3> 
                </ul>
            </div>
        </div>
        <div class="mt-5 p-4 bg-dark text-white text-center">
            <p >To know more read the <a href="getting-started.pdf" download="New_file_name">Guide book</a></p>
            <p >Dibyendu Laha | 2020 Batch | copyright, 2021 | All rights reserved by the owner.</p>
        </div>
    </div>`
}

export default home