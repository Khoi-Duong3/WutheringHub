package com.wuwaproject.backend.service;


import com.wuwaproject.backend.model.Resonator;
import com.wuwaproject.backend.repository.ResonatorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResonatorService {
    private final ResonatorRepository repo;

    public ResonatorService(ResonatorRepository repo){
        this.repo = repo;
    }

    public List<Resonator> findAll(){
        return repo.findAll();
    }

    public Resonator findById(Long id){
        return repo.findById(id). orElseThrow(() -> new RuntimeException("Character not found"));
    }
}
