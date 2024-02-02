class Character:
    def __init__(self, char_id, name, description, level, stats, characteristics, inventory, equipments, current_experience, current_health):
        self.id = char_id
        self.name = name
        self.description = description
        self.level = level
        self.stats = stats
        self.characteristics = characteristics
        self.inventory = inventory
        self.equipments = equipments
        self.current_experience = current_experience
        self.current_health = current_health

    def calculate_final_parameters(self):
        final_stats = self.stats.copy()
        final_characteristics = self.characteristics.copy()

        for _, item in self.equipments.items():
            if item and item.is_equipable:
                for stat, value in item.stats.items():
                    final_stats[stat] += value

                for characteristic, value in item.characteristics.items():
                    final_characteristics[characteristic] += value

        return final_stats, final_characteristics

    def calculate_final_max_health(self):
        final_stats, _ = self.calculate_final_parameters()
        return final_stats.get("health", 0)

    def calculate_final_max_mana(self):
        final_stats, _ = self.calculate_final_parameters()
        return final_stats.get("mana", 0)

    def calculate_experience_needed_for_next_level(self):
        return (self.level + 1) * 100  # Adjust the formula as needed

    def gain_experience(self, experience_points):
        self.current_experience += experience_points
        while self.current_experience >= self.calculate_experience_needed_for_next_level():
            self.level_up()

    def level_up(self):
        self.level += 1
        print(f"{self.name} leveled up to {self.level}!")

    def change_current_health(self, amount):
        max_health = self.calculate_final_max_health()
        self.current_health = min(max_health, max(0, self.current_health + amount))

    def take_damage(self, damage):
        final_stats, _ = self.calculate_final_parameters()
        effective_health = max(0, self.current_health + final_stats.get("health", 0))
        self.change_current_health(-min(damage, effective_health))

    def __str__(self):
        return f"Character(id={self.id}, name='{self.name}', level={self.level})"
