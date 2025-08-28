package com.wuwaproject.backend.web;

import java.util.List;

public record CharacterAllRowsDTO(
    int characterId,
    List<CharacterBaseRowDTO> rows
) {}
