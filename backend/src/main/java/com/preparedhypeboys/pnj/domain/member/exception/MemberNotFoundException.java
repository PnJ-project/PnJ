package com.preparedhypeboys.pnj.domain.member.exception;

import com.preparedhypeboys.pnj.global.error.exception.NotFoundException;

public class MemberNotFoundException extends NotFoundException {

    public MemberNotFoundException(String message) {
        super(message);
    }

}
