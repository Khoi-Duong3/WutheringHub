package com.wuwaproject.backend.web;

import java.math.BigDecimal;
import java.util.Map;

public record CharacterBaseRowDTO (
    int characterId,
    int ascension,
    int level,
    Map<String, BigDecimal> base
) {}
