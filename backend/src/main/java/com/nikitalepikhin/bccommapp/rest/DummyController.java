package com.nikitalepikhin.bccommapp.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hello")
@Api(value = "Dummy Controller")
public class DummyController {

    @GetMapping("/")
    @PreAuthorize("hasAuthority('dummy_read')")
    @ApiOperation(value = "Print out hello world")
    public ResponseEntity<?> getHelloWorld() {
        return ResponseEntity.ok("Hello, world!");
    }

    @PostMapping("/echo")
    @PreAuthorize("hasAuthority('dummy_write')")
    @ApiOperation(value = "Echo the received message")
    public ResponseEntity<?> echoMessage(@RequestBody String message) {
        return ResponseEntity.ok("Your message says:\n" + message);
    }
}
