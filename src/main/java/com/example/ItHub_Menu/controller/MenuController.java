package com.example.ItHub_Menu.controller;

import com.example.ItHub_Menu.model.DishDto;
import com.example.ItHub_Menu.service.DishService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Controller
public class MenuController {

    private final DishService dishService;

    public MenuController(DishService dishService) {
        this.dishService = dishService;
    }

    @PostConstruct
    public void init() {
        // Добавляем тестовое блюдо "борщ" если база данных пуста
        List<DishDto> dishes = dishService.getAllDishes();
        if (dishes.isEmpty()) {
            DishDto soup = new DishDto();
            soup.setName("Борщ");
            soup.setPrice(150);
            soup.setDescription("Традиционный украинский суп с свёклой, капустой, картофелем и мясом");
            soup.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Borscht_with_sour_cream.jpg/800px-Borscht_with_sour_cream.jpg");
            dishService.saveDish(soup);
        }
    }

    @GetMapping("/")
    public String getHomePage(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "menu";
    }
    
    @GetMapping("/menu")
    public String getMenu(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "menu";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
