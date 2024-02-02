from character import Character

class NPC(Character):
    def __init__(self, char_id, name, description, level, stats, characteristics, inventory, equipments, role):
        super().__init__(char_id, name, description, level, stats, characteristics, inventory, equipments)
        self.role = role

    def greet(self):
        print(f"{self.name} says: Hello, adventurer!")
