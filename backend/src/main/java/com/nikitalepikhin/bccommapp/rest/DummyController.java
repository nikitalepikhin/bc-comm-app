package com.nikitalepikhin.bccommapp.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DummyController {

    @GetMapping("/dummy")
    @PreAuthorize("hasAuthority('dummy_read')")
    public ResponseEntity<?> getDummyResource() {
        return ResponseEntity.ok("Hello from a dummy GET resource!");
    }

    @PostMapping("/dummy")
    @PreAuthorize("hasAuthority('dummy_write')")
    public ResponseEntity<?> getDummyResource(@RequestBody String message) {
        return ResponseEntity.ok("Your message says:\n" + message + "\nHello from a dummy POST resource!");
    }
}
