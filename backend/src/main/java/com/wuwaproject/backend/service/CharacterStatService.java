package com.wuwaproject.backend.service;

import com.wuwaproject.backend.model.CharacterBaseStat;
import com.wuwaproject.backend.repository.CharacterBaseStatRepository;
import com.wuwaproject.backend.web.CharacterAllRowsDTO;
import com.wuwaproject.backend.web.CharacterBaseRowDTO;
import com.wuwaproject.backend.web.CharacterSummaryDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@Service
public class CharacterStatService {
    private final CharacterBaseStatRepository repo;

    public CharacterStatService(CharacterBaseStatRepository repo) {
        this.repo = repo;
    }

    public List<CharacterSummaryDTO> listCharacters() {
        return repo.findAllCharacterSummaries();
    }

    public CharacterAllRowsDTO allRows(int characterId) {
        var list = repo.findByIdCharacterIdOrderByIdLevelAscIdAscensionAsc(characterId).stream().map(this::toRow).toList();

        return new CharacterAllRowsDTO(characterId, list);
    }

    public CharacterBaseRowDTO row(int characterId, int ascension, int level) {
        var e = repo.findByIdCharacterIdAndIdAscensionAndIdLevel(characterId, ascension, level)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No stats for id/asc/level"));
        return toRow(e);
    }

    private CharacterBaseRowDTO toRow(CharacterBaseStat e) {
        var base = new LinkedHashMap<String, java.math.BigDecimal>();
        base.put("hp",  e.getHp());
        base.put("atk", e.getAtk());
        base.put("def", e.getDef());
        return new CharacterBaseRowDTO(
            e.getId().getCharacterId(),
            e.getId().getAscension(),
            e.getId().getLevel(),
            base
        );
    }
}
