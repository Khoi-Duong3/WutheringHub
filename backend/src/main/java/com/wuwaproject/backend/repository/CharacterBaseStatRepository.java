package com.wuwaproject.backend.repository;

import com.wuwaproject.backend.model.CharacterBaseStat;
import com.wuwaproject.backend.model.CharacterBaseStatId;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface CharacterBaseStatRepository  extends JpaRepository<CharacterBaseStat, CharacterBaseStatId>{
    
    Optional<CharacterBaseStat> findByIdCharacterIdAndIdAscensionAndIdLevel(Integer characterId, Integer ascension, Integer level);
    List<CharacterBaseStat> findByIdCharacterIdOrderByIdLevelAscIdAscensionAsc(Integer characterId);

    List<com.wuwaproject.backend.web.CharacterSummaryDTO> findAllCharacterSummaries();

}
