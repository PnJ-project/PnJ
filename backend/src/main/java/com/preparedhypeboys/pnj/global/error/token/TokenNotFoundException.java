package com.preparedhypeboys.pnj.global.error.token;

import com.preparedhypeboys.pnj.global.error.exception.NotFoundException;

public class TokenNotFoundException extends NotFoundException {

    public TokenNotFoundException(String message) {
        super(message);
    }
}
