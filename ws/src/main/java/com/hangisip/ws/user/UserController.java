package com.hangisip.ws.user;

import org.springframework.web.bind.annotation.RestController;

import com.hangisip.ws.error.ApiError;
import com.hangisip.ws.shared.GenericMessage;

import jakarta.validation.Valid;

import java.util.stream.Collectors;

import com.hangisip.ws.shared.Messages;
import com.hangisip.ws.user.exception.NotUniqueEmailException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
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
                String message = Messages.getMessageForLocale(
                                "hangisip.create.user.success.message",
                                LocaleContextHolder.getLocale());
                return new GenericMessage(message);
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        ResponseEntity<ApiError> handleMethodArgNotValidEx(MethodArgumentNotValidException exception) {
                ApiError apiError = new ApiError();
                apiError.setPath("/api/v1/users");
                String message = Messages.getMessageForLocale("hangisip.error.validation",
                                LocaleContextHolder.getLocale());
                apiError.setMessage(message);
                apiError.setStatus(400);
                var validationErrors = exception.getBindingResult().getFieldErrors().stream()
                                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage,
                                                (existing, replacing) -> existing));
                apiError.setValidationErrors((validationErrors));
                return ResponseEntity.badRequest().body(apiError);
        }

        @ExceptionHandler(NotUniqueEmailException.class)
        ResponseEntity<ApiError> handleNotUniqueEmailEx(NotUniqueEmailException exception) {
                ApiError apiError = new ApiError();
                apiError.setPath("/api/v1/users");
                apiError.setMessage(exception.getMessage());
                apiError.setStatus(400);
                apiError.setValidationErrors(exception.getValidationErrors());
                return ResponseEntity.badRequest().body(apiError);
        }

}
