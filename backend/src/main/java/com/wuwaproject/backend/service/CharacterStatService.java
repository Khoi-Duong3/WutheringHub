package com.wuwaproject.backend.service;

import com.wuwaproject.backend.model.CharacterBaseStat;
import com.wuwaproject.backend.repository.CharacterBaseStatRepository;
import com.wuwaproject.backend.web.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class CharacterStatService {
  private final CharacterBaseStatRepository repo;
  public CharacterStatService(CharacterBaseStatRepository repo){ this.repo = repo; }

  public List<CharacterSummaryDTO> listCharacters() {
    return repo.findAllCharacterSummariesRaw().stream()
      .map(row -> {
        Integer id = (Integer) row[0];
        String name = (String) row[1];
        return new CharacterSummaryDTO(id, (name != null && !name.isBlank()) ? name : String.valueOf(id));
      })
      .toList();
  }

  public CharacterAllRowsDTO allRows(int characterId){
    var rows = repo.findAllByCharacter(characterId).stream().map(this::toRow).toList();
    return new CharacterAllRowsDTO(characterId, rows);
  }

  public CharacterBaseRowDTO row(int characterId, int ascension, int level){
    var e = repo.findOneByKey(characterId, ascension, level)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No stats for id/asc/level"));
    return toRow(e);
  }

  private CharacterBaseRowDTO toRow(CharacterBaseStat e){
    Map<String, BigDecimal> base = new LinkedHashMap<>();
    base.put("hp", e.getHp()); base.put("atk", e.getAtk()); base.put("def", e.getDef());
    return new CharacterBaseRowDTO(e.getId().getCharacterId(), e.getId().getAscension(), e.getId().getLevel(), base);
  }
}
