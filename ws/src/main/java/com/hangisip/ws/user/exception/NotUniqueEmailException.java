package com.hangisip.ws.user.exception;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.hangisip.ws.shared.Messages;

public class NotUniqueEmailException extends RuntimeException {

    public NotUniqueEmailException() {
        super(Messages.getMessageForLocale("hangisip.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors() {
        return Collections.singletonMap("email",
                Messages.getMessageForLocale("hangisip.constraint.emain.notunique", LocaleContextHolder.getLocale()));
    }
}
