class Tile:
    def __init__(self, tile_name, tile_description):
        self.tile_name = tile_name
        self.tile_description = tile_description
        self.characters = []
        self.transitions = {}

    def add_transition(self, target_tile_name, transition_description):
        self.transitions[target_tile_name] = transition_description
