package life.majiang.community.community.controller;

import life.majiang.community.community.dto.AccessTokenDTO;
import life.majiang.community.community.dto.GithubUser;
import life.majiang.community.community.provider.GithubProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.Action;

/**
 * @author suitao
 * @description
 */
@Controller
public class AuthorizeController {
    @Autowired
    private GithubProvider githubProvider;

    @Value("${github.client.id}")
    private String clientId;
    @Value("${github.client.secret}")
    private String secret;
    @Value("${github.client.redirect_uri}")
    private String redirectUri;
    @GetMapping("/callback")
    /*点击登录按钮："https://github.com/login/oauth/authorize?client_id=e357be22fa9a63fa1153
                &redirect_uri=http://localhost:8888/callback&scope=user&state=1*/
    /*github返回 /*http://localhost:8888/callback?code=3ff6af224218270fd8d3&state=1 */
    public String callback(@RequestParam(name = "code")String code,
                           @RequestParam(name = "state")String state,
                           HttpServletRequest request){
        AccessTokenDTO accessTokenDTO = new AccessTokenDTO();
        accessTokenDTO.setCode(code);
        accessTokenDTO.setState(state);
        accessTokenDTO.setRedirect_uri(redirectUri);
        accessTokenDTO.setClient_id(clientId);
        accessTokenDTO.setClient_secret(secret);
        String accessToken = githubProvider.getAccessToken(accessTokenDTO);
        GithubUser githubUser = githubProvider.getUser(accessToken);
        System.out.println(githubUser.getName());

        if(githubUser!=null){
            request.getSession().setAttribute("user",githubUser);
            return "redirect:/";
            //登录成功，写cookie。session
        }else{
            return "redirect:/";
            //登录失败，重新登录
        }
    }
}
