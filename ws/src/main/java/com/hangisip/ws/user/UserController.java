package com.hangisip.ws.user;

import org.springframework.web.bind.annotation.RestController;

import com.hangisip.ws.error.ApiError;
import com.hangisip.ws.shared.GenericMessage;

import jakarta.validation.Valid;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/v1/users")
    GenericMessage createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericMessage("Kullanıcı Oluşturuldu");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleMethodArgNotValidEx(MethodArgumentNotValidException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage("Validation error");
        apiError.setStatus(400);
        /*
         * Map<String, String> validationErrors = new HashMap<>();
         * for (var fieldError : exception.getBindingResult().getFieldErrors()) {
         * validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
         * }
         */
        var validationErrors = exception.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        apiError.setValidationErrors((validationErrors));
        return ResponseEntity.badRequest().body(apiError);
    }

}
