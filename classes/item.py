class Item:
    def __init__(self, item_id, title, description, is_equipable, equipable_slot, current_durability, max_durability, stats=None, characteristics=None):
        self.id = item_id
        self.title = title
        self.description = description
        self.is_equipable = is_equipable
        self.equipable_slot = equipable_slot
        self.current_durability = current_durability
        self.max_durability = max_durability
        self.stats = stats if stats else {}
        self.characteristics = characteristics if characteristics else {}

    def __str__(self):
        return f"Item(id={self.id}, title='{self.title}', is_equipable={self.is_equipable}, equipable_slot='{self.equipable_slot}')"
