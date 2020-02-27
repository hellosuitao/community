function reply() {
    var questionId = $("#question_id").val();
    // console.log(questionId);
    var commentContent = $("#comment_content").val();
    // console.log(commentContent);
    // alert("hello");
    if(!commentContent){
        alert("不能回复空内容");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/comment",/*如果不加'/',请求路径是当前上下文的路径localhost:8888/question/comment
                          加上'/'  请求路径为localhost:8888/comment*/
        contentType:'application/json',
        data:JSON.stringify({/*Json.stringify  错误写法*/
            "parentId":questionId,
            "content":commentContent,
            "type":1
        }),
        success:function (data) {
            if(data.code==200){
                // $("#comment_section").hide();
                window.location.reload();
            }else{
                debugger;
                if(data.code==2003){
                    var isAccepted = confirm(data.message());
                    if(isAccepted){
                        window.open("https://github.com/login/oauth/authorize?client_id=aa1e158833a0de892731&redirect_uri=http://localhost:8888/callback&scope=user&state=1");
                        window.localStorage.setItem("closable",true);
                    }
                }else{
                    alert(data.message);
                }
            }
            console.log(response);
        },
        dataType:"json"
    });
}

function comment(e) {
    var commentId = e.getAttribute("data-id");
    var commentContent = $("#input-"+commentId).val();
    if(!commentContent){
        alert("不能回复空内容");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/comment",/*如果不加'/',请求路径是当前上下文的路径localhost:8888/question/comment
                          加上'/'  请求路径为localhost:8888/comment*/
        contentType:'application/json',
        data:JSON.stringify({/*Json.stringify  错误写法*/
            "parentId":questionId,
            "content":commentContent,
            "type":2
        }),
        success:function (data) {
            if(data.code==200){
                // $("#comment_section").hide();
                window.location.reload();
            }else{
                debugger;
                if(data.code==2003){
                    var isAccepted = confirm(data.message());
                    if(isAccepted){
                        window.open("https://github.com/login/oauth/authorize?client_id=aa1e158833a0de892731&redirect_uri=http://localhost:8888/callback&scope=user&state=1");
                        window.localStorage.setItem("closable",true);
                    }
                }else{
                    alert(data.message);
                }
            }
            console.log(response);
        },
        dataType:"json"
    });


    
}

//展开二级评论
function collapseComments(e) {
    var id = e.getAttribute("data-id");
    /*获取二级评论展开的状态*/
    var collapse = e.getAttribute("data-collapse");
    if(collapse){
        /*折叠二级评论*/
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.class.remove("active");
    }else{
        /*展开二级评论*/
        $.getJSON( "/comment/"+id, function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
                items.push( "<li id='" + key + "'>" + val + "</li>" );
            });

            $( "<ul/>", {
                "class": "my-new-list",
                html: items.join( "" )
            }).appendTo( "body" );
        });
        comments.addClass("in");
        e.setAttribute("data-collapse","in");
        e.classList.add("active");
    }
    /*展开二级评论*/
   /* var comments = $("#comment-"+id);
    comments.addClass("in");
    e.setAttribute("data-collapse","in");*/
}