package com.wuwaproject.backend.repository;

import com.wuwaproject.backend.model.ResonatorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ResonatorInfoRepository extends JpaRepository<ResonatorInfo, Integer> {
    Optional<ResonatorInfo> findByNameIgnoreCase(String name);
    List<ResonatorInfo> findByElementIgnoreCase(String element);
    List<ResonatorInfo> findByWeaponTypeIgnoreCase(String weaponType);

   
    List<ResonatorInfo> findByNameContainingIgnoreCase(String q);

    List<ResonatorInfo> findByElementIgnoreCaseAndWeaponTypeIgnoreCase(String element, String weaponType);
}
