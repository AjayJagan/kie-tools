export const dashbuilderCompletion = `datasets:
- uuid: products
  content: >-
            [
              ["Computers", "Scanner", 5, 3],
              ["Computers", "Printer", 7, 4],
              ["Computers", "Laptop", 3, 2],
              ["Electronics", "Camera", 10, 7],
              ["Electronics", "Headphones", 5, 9]
            ]
  columns:
    - id: Section
      type: LABEL
    - id: Product
      type: LABEL
    - id: Quantity
      type: NUMBER
    - id: Quantity2
      type: NUMBER
pages:
- components:
    - html: Welcome to Dashbuilder!
      properties:
        font-size: xx-large
        margin-bottom: 30px
    - settings:
        type: BARCHART
        dataSetLookup:
            uuid: products
            group:
                - columnGroup:
                    source: Product
                  groupFunctions:
                    - source: Product
                    - source: Quantity
                      function: SUM
                    - source: Quantity2
                      function: SUM
    - settings:
        type: TABLE
        dataSetLookup:
            uuid: products`;
