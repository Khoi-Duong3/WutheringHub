package com.wuwaproject.backend.web;

import com.wuwaproject.backend.model.ResonatorInfo;
import com.wuwaproject.backend.repository.ResonatorInfoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class ResonatorInfoController {
    private final ResonatorInfoRepository repo;
    public ResonatorInfoController(ResonatorInfoRepository repo) { this.repo = repo; }

    @GetMapping
    public List<ResonatorInfo> all(@RequestParam(required = false) String element) {
        return (element == null || element.isBlank())
            ? repo.findAll()
            : repo.findByElementIgnoreCase(element);
    }

    @GetMapping("/{id}")
    public ResonatorInfo one(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow();
    }
}
