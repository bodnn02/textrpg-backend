from tile import Tile  # Import the Tile class from the tile.py file

class Location:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.tiles = {}

    def add_tile(self, tile_name, tile_description):
        tile = Tile(tile_name, tile_description)
        self.tiles[tile_name] = tile

    def add_character_to_tile(self, tile_name, character):
        if tile_name in self.tiles:
            self.tiles[tile_name].characters.append(character)
        else:
            print(f"Error: Tile '{tile_name}' not found in location '{self.name}'.")

    def move_character(self, character, current_tile_name, target_tile_name):
        if current_tile_name in self.tiles and target_tile_name in self.tiles:
            current_tile = self.tiles[current_tile_name]
            target_tile = self.tiles[target_tile_name]

            if character in current_tile.characters:
                current_tile.characters.remove(character)
                target_tile.characters.append(character)
                print(f"{character.name} moved from '{current_tile_name}' to '{target_tile_name}'.")
            else:
                print(f"Error: {character.name} not found in '{current_tile_name}'.")
        else:
            print("Error: Invalid tile names.")

    def get_transitions(self, current_tile_name):
        if current_tile_name in self.tiles:
            current_tile = self.tiles[current_tile_name]
            return current_tile.transitions
        else:
            print(f"Error: Tile '{current_tile_name}' not found in location '{self.name}'.")
            return {}