use std::fmt::Debug;

trait Resource : Debug {
    fn mount(&mut self);
    fn on_dismount(&mut self);
    fn get_components(&self) -> Vec<Box<dyn Resource>>;
}



fn main() {
    
}



/*
    Resources 
        - Have a mount method to attach components to themselves
        - Components are resources
        - Components have events
*/
