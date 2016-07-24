/// <reference path="DataItem"/>
module Fayde.Controls {
    import DataItem = Fayde.Controls.DataItem;
    import IEnumerable = nullstone.IEnumerable;
    import IEnumerator = nullstone.IEnumerator;
    export class DataPath extends IEnumerable<DataItem> {

        private m_path: DataItem[];

        public static get Empty():DataPath{
            var array = [];
            var dataItem = new DataItem(array,false);
            var dataPath = new DataPath(dataItem,null,0,false,null,null);
            return dataPath;
        }

        // Create an instance with a list of 1 item.
        constructor(rootItem: DataItem,children:  DataItem[],length: number,useClientArray: boolean,objectPath: DataItem[],obj: DataItem)
        constructor(rootItem?: DataItem,children?:  DataItem[],length?: number,useClientArray?: boolean,objectPath?: DataItem[],obj?: DataItem)
        {
            super();

            if(obj != null){
                this.m_path = new Array<DataItem>();
                this.m_path.push(obj);
            }else{
                if( !useClientArray )
                {
                    var newPath = new DataItem[ length ];
                    objectPath.forEach(element => {
                        newPath.push(element);
                    });
                    this.m_path = newPath;
                }
                else
                {
                    this.m_path = objectPath;
                }
            }

            

        }
/*
    public DataPath( DataItem[] objectPath )
      : this( objectPath, objectPath.Length, false )
    {
    }
*/
/*
    public DataPath( DataItem[] objectPath, int length )
      : this( objectPath, length, false )
    {
    }
*/
/*
    internal DataPath( DataItem[] objectPath, bool useClientArray )
      : this( objectPath, objectPath.Length, useClientArray )
    {
    }
*/

/*
    internal DataPath( DataItem[] objectPath, int length, bool useClientArray )
    {
      if( objectPath == null )
        throw new ArgumentNullException( "objectPath" );

      if( length < 0 )
        throw new ArgumentOutOfRangeException( "length", "length must be greater than or equal to zero." );

      if( objectPath.Length < length )
        throw new ArgumentException( "The length of the specified DataItem array must be greater than or equal to the specified length.", "objectPath" );

      for( int i = 0; i < length; i++ )
      {
        if( objectPath[ i ] == null )
          throw new ArgumentException( "The specified DataItem array cannot contain null items.", "objectPath" );
      }

      if( !useClientArray )
      {
        DataItem[] newPath = new DataItem[ length ];
        Array.Copy( objectPath, newPath, length );
        m_path = newPath;
      }
      else
      {
        if(length != objectPath.Length)
          throw new InvalidOperationException( "The objectPath length is inconsistent with the length parameter." );

        m_path = objectPath;
      }
    }*/


    /*
    public DataPath( DataItem[] parentPath, DataItem child )
    {
      if( parentPath == null )
        throw new ArgumentNullException( "parentPath" );

      if( child == null )
        throw new ArgumentNullException( "child" );

      m_path = new DataItem[ parentPath.Length + 1 ];
      Array.Copy( parentPath, m_path, parentPath.Length );
      m_path[ m_path.Length - 1 ] = child;
    }*/

/*
    public DataPath( DataItem rootItem, DataItem[] children )
    {
      if( rootItem == null )
        throw new ArgumentNullException( "rootItem" );

      if( children == null )
        throw new ArgumentNullException( "children" );

      m_path = new DataItem[ children.Length + 1 ];
      m_path[ 0 ] = rootItem;
      Array.Copy( children, 0, m_path, 1, children.Length );
    }
*/
    public get ParentPath() {
        if( this.m_path.length == 1 )
          return null;
        var ret = new DataItem[ this.m_path.length - 1 ];
        this.m_path.forEach(element => {
            ret.push(element);
        });
        return new DataPath(null,null,0,true,ret, null);
    }

    public get LastChild() {
        return this.m_path[this.m_path.length -1];
    }

    public get Depth() {
        return this.m_path.length;
    }

    public get Path() {
        return this.m_path;
    }

    public getItem(index:number): DataItem{
        return this.m_path[ index ];
    }    

    public setItem(index:number,value: DataItem){
        this.m_path[ index ] = value;
    }

    public CreateChildPath(child: DataItem):DataPath
    {
      return new DataPath(null,null,0,false,this.m_path, child);
    }

    public CreateChildPathEx(childPath: DataPath,startIndex: number,length: number ):DataPath
    {
      var childDepth = childPath.Depth;

      var newArray = new DataItem[ this.Depth + length ];

      this.m_path.forEach(element => {
          newArray.push(element);
      });

      childPath.m_path.forEach(element => {
          newArray.push(element);
      });

      return new DataPath(newArray,null,0, true,null,null );
    }

    public CreateAncestorPath(depth: number ):DataPath
    {
      return this.CreateAncestorOrSamePath( depth );
    }

    public CreateAncestorOrSamePath(depth: number ):DataPath
    {

      var newArray = new DataItem[ depth ];

      this.m_path.forEach(element => {
          newArray.push(element);
      });

      var newPath = new DataPath( newArray,null,0, true,null,null );

      return newPath;
    }

    // of the current path.
    public IsAncestorOf(childPath: DataPath ): boolean
    {
      if( this.m_path.length < childPath.m_path.length )
      {
        return DataPath.AreSameItems( this.m_path, childPath.m_path, this.m_path.length );
      }
      return false;
    }

    public IsAncestorOfEx(arrayPath: DataItem[],validDepth: number ): boolean
    {
      if( this.m_path.length < validDepth ) // childPath.m_path.Length )
      {
        return DataPath.AreSameItems( this.m_path, arrayPath, this.m_path.length );
      }
      return false;
    }

    public ToArray(): DataItem[]
    {
      var newArray = new DataItem[ this.Depth ];
      this.m_path.forEach(element => {
          newArray.push(element);
      });
      return newArray;
    }   

    public IsDescendantOf(parentPath: DataPath ): boolean
    {
      return parentPath.IsAncestorOf( this );
    }

    public Equals( obj: any ): boolean
    {
      var nodePath = obj as DataPath;
      if( ( nodePath == null ) || this.m_path.length != nodePath.m_path.length )
        return false;

      return DataPath.AreSameItems( this.m_path, nodePath.m_path, this.m_path.length );
    }

    static AreSameItems(array1: DataItem[],array2: DataItem[],len: number ): boolean
    {
        for(var i = 0; i < len; i++ )
        {
            if( !nullstone.equals( array1[ i ], array2[ i ] ) )
            {
            return false;
            }
        }
        return true;
    }

    // with the topmost parent.
    public GetEnumerator(): IEnumerator<DataItem>
    {
        var result = [];
        this.m_path.forEach(dgi => {
            result.push(dgi);
        });
        return <IEnumerator<DataItem>>IEnumerator_.fromArray(result);
    }


    
  }
}