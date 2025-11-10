package com.example.demo; // Make sure this package name matches yours

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/moods")
@CrossOrigin // This is crucial! Allows our frontend to call the backend.
public class MoodController {

    @Autowired
    private MoodEntryRepository repository;

    // GET endpoint to fetch all entries
    @GetMapping
    public List<MoodEntry> getAllMoodEntries() {
        // Uses the custom method we defined in the repository
        return repository.findAllByOrderByTimestampDesc();
    }

    // POST endpoint to create a new entry
    @PostMapping
    public MoodEntry createMoodEntry(@RequestBody MoodEntry moodEntry) {
        // The timestamp is set automatically by the MoodEntry constructor
        return repository.save(moodEntry);
    }
}
