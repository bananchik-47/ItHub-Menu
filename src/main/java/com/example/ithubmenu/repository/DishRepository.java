package com.example.ithubmenu.repository;

import com.example.ithubmenu.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<Dish, Long> {
}
