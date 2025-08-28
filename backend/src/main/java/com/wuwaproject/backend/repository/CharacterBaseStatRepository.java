package com.wuwaproject.backend.repository;

import com.wuwaproject.backend.model.CharacterBaseStat;
import com.wuwaproject.backend.model.CharacterBaseStatId;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface CharacterBaseStatRepository extends JpaRepository<CharacterBaseStat, CharacterBaseStatId> {

  @Query("""
    select c
    from CharacterBaseStat c
    where c.id.characterId = :cid
    order by c.id.level asc, c.id.ascension asc
  """)
  List<CharacterBaseStat> findAllByCharacter(@Param("cid") Integer characterId);

  @Query("""
    select c
    from CharacterBaseStat c
    where c.id.characterId = :cid and c.id.ascension = :asc and c.id.level = :lvl
  """)
  Optional<CharacterBaseStat> findOneByKey(@Param("cid") Integer characterId,
                                           @Param("asc") Integer ascension,
                                           @Param("lvl") Integer level);

  // 🔽 Return raw values (no casting/coalesce in JPQL)
  @Query("""
    select distinct c.id.characterId, c.name
    from CharacterBaseStat c
  """)
  List<Object[]> findAllCharacterSummariesRaw();
}
