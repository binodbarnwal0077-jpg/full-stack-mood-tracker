package com.example.demo; // Make sure this package name matches yours

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {

    // This custom method finds all entries and orders them by the timestamp
    // Spring Data JPA automatically understands what to do from the method name!
    List<MoodEntry> findAllByOrderByTimestampDesc();
}