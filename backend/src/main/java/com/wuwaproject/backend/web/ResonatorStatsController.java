package com.wuwaproject.backend.web;

import com.wuwaproject.backend.model.ResonatorStats;
import com.wuwaproject.backend.repository.ResonatorStatsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/char_stats")
public class ResonatorStatsController {

    private final ResonatorStatsRepository repo;

    public ResonatorStatsController(ResonatorStatsRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<ResonatorStats> list(
        @RequestParam Long characterId,
        @RequestParam(required = false) Integer ascension,
        @RequestParam(required = false) Integer level){

            if (ascension != null && level != null){
                return repo.findByIdCharacterIdAndIdAscensionAndIdLevel(characterId, ascension, level).map(List::of).orElse(List.of());
            }
            if (ascension != null){
                return repo.findByIdCharacterIdAndIdAscensionOrderByIdLevelAsc(characterId, ascension);
            }

            return repo.findByIdCharacterIdOrderByIdAscensionAscIdLevelAsc(characterId);
        }

        @GetMapping("/{characterId}/{ascension}/{level}")
        public ResonatorStats one(
            @PathVariable Long characterId,
            @PathVariable Integer ascension,
            @PathVariable Integer level) {
                return repo.findByIdCharacterIdAndIdAscensionAndIdLevel(characterId, ascension, level).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
