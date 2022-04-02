package com.nikitalepikhin.bccommapp.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
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
    @Operation(summary = "Print out hello world",
            parameters = {@Parameter(name = "Authorization", in = ParameterIn.HEADER, schema = @Schema(implementation = String.class), required = true)})
    public ResponseEntity<String> getHelloWorld() {
        System.out.println("got the dummy request");
        return ResponseEntity.ok("Hello, world!");
    }

    @PostMapping("/echo")
    @PreAuthorize("hasAuthority('dummy_write')")
    @Operation(summary = "Echo the received message",
            parameters = {@Parameter(name = "Authorization", in = ParameterIn.HEADER, schema = @Schema(implementation = String.class), required = true)})
    public ResponseEntity<String> echoMessage(@RequestBody String message) {
        return ResponseEntity.ok("Your message says:\n" + message);
    }
}
