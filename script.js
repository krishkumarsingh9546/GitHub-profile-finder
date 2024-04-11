const search = document.querySelector('.search');
const searchBtn = document.querySelector('.searchBtn');
const BASE_URl = "https://api.github.com/users/";
const githubProfileDetails =document.querySelector('.github-profile-details');
let loader = document.querySelector('.loader');
const userUrl = "https://github.com/";

function showLoader(){
    loader.classList.add('show');
    githubProfileDetails.classList.add("hide");
}

function removeLoader(){
    loader.classList.remove('show');
    githubProfileDetails.classList.remove("hide");
}


async function fetchGithubProfileDetails(){
    let response = await fetch(`${BASE_URl}${search.value}`);
    let result = await response.json();
    console.log(result);

    if(result){
        removeLoader();
        displayProfileDetails(result);
        search.value= "";
    }

}

function displayProfileDetails(getProfileDetails){
    let {login, avatar_url, public_repos, followers, following} = getProfileDetails;
    githubProfileDetails.innerHTML = `

    <img class="h-52 w-52 object-cover rounded-full" src=${avatar_url} alt=${login}>
    
    <p class="username mt-2 text-white font-medium font-serif text-lg">username:- ${login}</p>

    <p class="repos text-white">Repos: ${public_repos}</p>

    <p class="follower text-white">Followers: ${followers}</p>

    <p class="following text-white ">Following: ${following}</p>
    
    <a class="text-white" href="${userUrl}${login}" target="_blank">GitHub link 👈</a>
    
    `;
}



searchBtn.addEventListener("click", fetchGithubProfileDetails);



let searchEnter = (e)=>{

    if(search.value==""){
        return;
    }

    if(e.key == "Enter"){
        fetchGithubProfileDetails();
    }

}

search.addEventListener("keyup", searchEnter);