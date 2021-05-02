


$('#usBut').on('click',DataUser);
//$('#posBut').on('click',DataPost);
//$('#comBut').on('click',DataComent);
let url='http://localhost:3000/'
function DataUser(){
    $('.delete').hide()
    $('h4.delteText').remove()
    $('#finalDelet').remove()
    $('#Delet').remove()
   
    return axios.get(url+'users')
    
    .then(
        function dataU(responseUs){
            let objArry=responseUs.data
           
            let count=0;
            $.each( responseUs.data, function( index, elemUs ){
                
                if($('#floatingInput').val()==elemUs.name){
                    $('#post').empty();
                 /*$('.name').text('thats your id '+`${elemUs.id}`)  
                  $('.usName').text('thats your username '+`${elemUs.username}`)  
                  $('.usEmail').text('thats your email '+` ${elemUs.email}`)*/
                  DataPost(elemUs.name,elemUs.id);
                  count+=1;
                } 
            })
            if($('#floatingInput').val()==''){
                DataPost(objArry);
                count+=1;
            }   
            if(count==0){
                $('#post').text('el usuario que mencionas no esta registrado')
            }    
        }    
    )
    .catch(function (error) {
        console.log(error);
      });
            
}
namesUsers=[];
idUsers=[];
function DataPost(userName,userId){
    if(userId==undefined){
        
        
                namesUsers=[];
                idUsers=[];
                $.each(userName,function(index,namesUser){
                   
                    namesUsers.push(namesUser.name)
                    idUsers.push(namesUser.id)
                    console.log('hola',idUsers[index])
                    return axios.get(url+`users/${index+1}/post`)
                    .then(
                        function dataP(responsePos){
                            //$.each( responsePos.data, function( inde, elemPos ){  
                                console.log(responsePos.data)
                            $('#post').append('<div></div>');
                            $('#post div:last-child').attr('id',`posCont${index+1}`);
                            $('#post div:last-child').attr('class','col');
                            $(`#posCont${index+1}`).append('<p>'+`${index+1}`+'</p>')
                           $(`#posCont${index+1}`).append('<p>'+`<span class='user'>${namesUsers[index]}</span>  :`+'</p>');
                          

                           
                           $.each( responsePos.data, function( inde, elemPos ){ 
                            $(`#posCont${index+1}`).append('<button  class="sendButP" data-toggle="modal" data-target="#exampleModalCenter"><span>Post'+`${inde+1}`+'</span></button>');
                           $(`#posCont${index+1}`).append('<p class="titles">'+` ${elemPos.title}`+'</p>');
                           $(`#posCont${index+1} button.sendButP`).on('click',function(){postDataModal(this,elemPos.id,elemPos.body,namesUser.name)});
                         })
                        }
                    )
                 /*console.log(namesUsers)
                console.log( idUsers)
                let cnt=0;
                $.each( responsePos.data, function( index, elemPos ){  
                    console.log(idUsers[index])
                    if(idUsers[index]==elemPos.userId){
                        
                         $('#post').append('<div></div>');
                            $('#post div:last-child').attr('id','posCont'+index);
                            $('#post div:last-child').attr('class','col');

                            //$(`#posCont${index}`).append('<p>'+`${elemPos.id}`+'</p>')
                            $(`#posCont${index}`).append('<p>'+`<span class='user'>${name}</span>  :`+'</p>');
                            $(`#posCont${index}`).append('<p>'+`<span class='tit'>Post ${index+1} :<br></span> ${elemPos.title}`+'</p>');
                            
                            //$(`#posCont${index}`).append('<p>'+`${elemPos.body}`+'</p>')
                            $(`#posCont${index}`).append('<button  class="sendButP" data-toggle="modal" data-target="#exampleModalCenter">Full info</button>');
                            $(`#posCont${index}`).append('<button  class="deleButP">X</button>');
                            $(`#posCont${index} button.deleButP`).on('click',function(){deletePost(userName,elemPos.id)});
                            $(`#posCont${index} button.sendButP`).on('click',function(){postDataModal(this,elemPos.id,elemPos.body,userName)});
                    } */  
                })
            
    
        
       
    }else{
    return axios.get(url+`users/${userId}/post`)
    .then(
        function dataP(responsePos){
            let cnt=0;
            $.each( responsePos.data, function( index, elemPos ){
                
                
               // if(userId==elemPos.userId){
                    cnt=cnt+1;
                    $('#post').append('<div></div>');
                    $('#post div:last-child').attr('id','posCont'+index);
                    $('#post div:last-child').attr('class','col');

                    //$(`#posCont${index}`).append('<p>'+`${elemPos.id}`+'</p>')
                    $(`#posCont${index}`).append('<p>'+`<span class='user'>${userName}</span>  :`+'</p>');
                    $(`#posCont${index}`).append('<p>'+`<span class='tit'>Post ${cnt} :<br></span> ${elemPos.title}`+'</p>');
                    
                    //$(`#posCont${index}`).append('<p>'+`${elemPos.body}`+'</p>')
                    $(`#posCont${index}`).append('<button  class="sendButP" data-toggle="modal" data-target="#exampleModalCenter">Full info</button>');
                    $(`#posCont${index}`).append('<button  class="deleButP">X</button>');
                    $(`#posCont${index} button.deleButP`).on('click',function(){deletePost(userName,elemPos.id)});
                    $(`#posCont${index} button.sendButP`).on('click',function(){postDataModal(this,elemPos.id,elemPos.body,userName)});
              //  }   
                })
            }
        )
    }
}
function deletePost(userNam,postID){
    $('.delete').show()
    $('.delete').append(`<h4 class='delteText'> ¿Are your sure to delete the post of ${userNam}? </h4>`)
    $('.delete').append(`<button id='finalDelet' class='sendButP'>Confirm</button>`)
    $('.delete').append(`<button id='Delet' class='deleButP'>X</button>`)
    $('#Delet').on('click',function removePost (){
        $('.delete').hide();
        $('h4.delteText').remove();
        $('#finalDelet').remove();
        $('#Delet').remove();
    })
    
    $('#finalDelet').on('click',function(){
        axios.delete(url+`post/${postID}`).then(
           
            DataUser()
            
          )
          .catch(function (error) {
            console.log(error);
          });
    })
}

function postDataModal(event,post_id,post_body,user_name){
    console.log(post_id,post_body)
    $('.comBox').empty();
    $('.modal-header img').remove();
    $('#exampleModalLongTitle').empty();
    $('#exampleModalLongTitle').append(`<p class='idpost'>${user_name} post: </p>`);
    $('.modal-header').prepend('<img src="https://yt3.ggpht.com/ytc/AAUvwngLxx3Ylzao3sJXP_H8faqBjtRf6VO0dX8ZkVJt=s176-c-k-c0x00ffffff-no-rj" alt="hola">')
    $('#textContent').empty();
    $('#textContent').append(`<p class='bodypost'>${post_body}</p>`);
    $('#buttonsZone').empty();
    $('#buttonsZone').append(`<button class="sendButC">See post coments </button>`);
    //$('button.sendButC').on('click',function(){DataComent(post_id)})

    //$('button.sendButC').on('click',function(){DataComent(post_id)})


    $('button.sendButC').on('click',function(){DataComent(post_id)})

    $(event).parent().css('transition','2s');
    x=+1;



}

function DataComent(idpost){
   $('.modal-header').css('opacity','0.7');
   $('.modal-body').css('opacity','0.7');
   $('.modal-footer').css('opacity','0.7');
    
    return axios.get(url+`post/${idpost}/coments`)
    .then(
        function dataCom(responseCom){
            
            $.each( responseCom.data, function( index, elemCom ){
               
               
                    
                    $('.comBox').append(`<div class='comntbox2' id="coment${index}"></div>`)
                    $(`#coment${index}`).append(`<p class="nameCom">${elemCom.name}</p>`)
                    $(`#coment${index}`).append(`<p class="bodyCom">Says:<br>${elemCom.body}</p>`)
                    $(`#coment${index}`).append(`<p class="emailCom">To answer:<br>${elemCom.email}</p>`)
                    
                   $('.comntbox2').on('click',function(){
                        $('p.bodyCom',this).show()
                        $('p.emailCom',this).show()
                    
                   })
                            
            })
        }
    )
}
