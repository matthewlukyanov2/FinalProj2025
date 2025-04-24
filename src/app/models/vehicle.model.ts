export interface Vehicle {
    reg: string;
    make: string;
    model: string;
    owner: {
      cid: string;
      name: string;
    };
    mechanic: {
      mid: string;
      name: string;
      salary: number;
      garage: {
        gid: string;
        location: string;
        budget: number;
      };
    };
  }
  