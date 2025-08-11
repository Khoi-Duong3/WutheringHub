package com.wuwaproject.backend.repository;

import com.wuwaproject.backend.model.ResonatorStats;
import com.wuwaproject.backend.model.ResonatorStatsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResonatorStatsRepository extends JpaRepository<ResonatorStats,ResonatorStatsId>{

    List<ResonatorStats> findByIdCharacterIdOrderByIdAscensionAscIdLevelAsc(Long characterId);

    List<ResonatorStats> findByIdCharacterIdAndIdAscensionOrderByIdLevelAsc(Long characterId, Integer ascension);

    Optional<ResonatorStats> findByIdCharacterIdAndIdAscensionAndIdLevel(Long characterId, Integer ascension, Integer level);
}
