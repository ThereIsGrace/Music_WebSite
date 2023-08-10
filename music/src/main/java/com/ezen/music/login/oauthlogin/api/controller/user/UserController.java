package com.ezen.music.login.oauthlogin.api.controller.user;

import com.ezen.music.login.oauthlogin.api.service.UserService;
import com.ezen.music.login.oauthlogin.api.entity.user.User;
import com.ezen.music.login.oauthlogin.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public ApiResponse getUser() {
        // SecurityContextHolder에 저장되어 있던 로그인 정보를 가져와서 principal 객체에 담는다.
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 로그인 정보중 사용자 이름을 통해서 사용자 정보를 얻는다.
        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }
}
