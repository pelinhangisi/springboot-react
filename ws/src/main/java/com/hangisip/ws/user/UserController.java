package com.hangisip.ws.user;

import org.springframework.web.bind.annotation.RestController;

import com.hangisip.ws.error.ApiError;
import com.hangisip.ws.shared.GenericMessage;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/v1/users")
    ResponseEntity<?> createUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users");
            apiError.setMessage("Validation error");
            apiError.setStatus(400);
            Map<String, String> validationErrors = new HashMap<>();
            validationErrors.put("username", "Zorunlu Alan");
            apiError.setValidationErrors(validationErrors);
            return ResponseEntity.badRequest().body(apiError);
        }

        userService.save(user);
        return ResponseEntity.ok(new GenericMessage("Kullanıcı Oluşturuldu"));
    }

}
