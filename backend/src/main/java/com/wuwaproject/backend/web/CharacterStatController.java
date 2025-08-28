package com.wuwaproject.backend.web;

import com.wuwaproject.backend.service.CharacterStatService; // match your actual class name
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin
public class CharacterStatController {
  private final CharacterStatService svc;
  public CharacterStatController(CharacterStatService svc) { this.svc = svc; }

  @GetMapping("") // explicit
  public List<CharacterSummaryDTO> list() {
    return svc.listCharacters();
  }

  @GetMapping("/{id}/stats/all")
  public CharacterAllRowsDTO all(@PathVariable("id") int id) {
    return svc.allRows(id);
  }

  @GetMapping("/{id}/stats")
  public CharacterBaseRowDTO one(
      @PathVariable("id") int id,
      @RequestParam("ascension") int ascension,
      @RequestParam("level") int level
  ) {
    return svc.row(id, ascension, level);
  }
}
