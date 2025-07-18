package com.wuwaproject.backend.web;

import com.wuwaproject.backend.model.Resonator;
import com.wuwaproject.backend.service.ResonatorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resonators")
@CrossOrigin(origins = "http://localhost:3000")
public class ResonatorController {
    private final ResonatorService service;
    public ResonatorController(ResonatorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resonator> listAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Resonator getOne(@PathVariable Long id){
        return service.findById(id);
    }
}
