package com.preparedhypeboys.pnj.domain.calendar.exception;

import com.preparedhypeboys.pnj.global.error.exception.NotFoundException;

public class TodoNotFoundException extends NotFoundException {

    public TodoNotFoundException(String message) {
        super(message);
    }
}
