package com.hangisip.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.hangisip.ws.shared.Messages;

public class ActivationNotificationException extends RuntimeException {

    public ActivationNotificationException() {
        super(Messages.getMessageForLocale("hangisip.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}
