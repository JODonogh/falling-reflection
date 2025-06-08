package com.fallingreflection.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @PostMapping
    public Score createScore(@RequestBody Score score){
        return scoreRepository.save(score);
    }

    @GetMapping
    public List<Score> getLeaderboard(){
        return scoreRepository.findTop10ByOrderByScoreDesc();
    }
}