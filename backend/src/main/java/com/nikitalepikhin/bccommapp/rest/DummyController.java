package com.nikitalepikhin.bccommapp.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hello")
@Tag(name = "Dummy Controller")
public class DummyController {

    @GetMapping("/")
    @PreAuthorize("hasAuthority('dummy_read')")
    @Operation(summary = "Print out hello world")
    public ResponseEntity<?> getHelloWorld() {
        return ResponseEntity.ok("Hello, world!");
    }

    @PostMapping("/echo")
    @PreAuthorize("hasAuthority('dummy_write')")
    @Operation(summary = "Echo the received message")
    public ResponseEntity<?> echoMessage(@RequestBody String message) {
        return ResponseEntity.ok("Your message says:\n" + message);
    }
}
