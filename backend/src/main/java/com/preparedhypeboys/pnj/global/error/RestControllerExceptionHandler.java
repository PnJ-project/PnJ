package com.preparedhypeboys.pnj.global.error;

import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import com.preparedhypeboys.pnj.global.error.exception.InvalidException;
import com.preparedhypeboys.pnj.global.error.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ResponseDto<String>> handleNotFoundException(
        IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.create(exception.getMessage())
        );
    }

    @ExceptionHandler({InvalidException.class})
    public ResponseEntity<ResponseDto<String>> handleInvalidException(
        IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            ResponseDto.create(exception.getMessage())
        );
    }

}
