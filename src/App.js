import './App.css';
import './style.css';
import Select from './Select';
import Map from './Map';
import Pie from './Pie';
import List from './list';
import Bar from './Bar';
import Mds from './mds';
import Matrix from './Matrix';

function App() {
  return (
    <div className="App" style={{width:"100%",height:'100%'}}>

        <div id="top" style={{border:'dashed',borderWidth:2,marginLeft:'1px',
                            borderColor:'rgba(1,1,1,0.5)'}}>
            <h1 style={{marginTop:'-3px',fontFamily:'微软雅黑',color:"DimGrey"}}>
              碳排放数据可视系统
            </h1>
        </div>

        <div id="left" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',marginRight:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)',borderLeftColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
              <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                碳排放省份选择
              </h3>
            </div>
            <div  style={{width:'99%',height:'200px',border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)'}}>
                <Select />
            </div>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
                <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                各省产业部门碳排放结构相似性
                </h3>

            </div>
            <div style={{height:'247px',width:'455px'}}>
                <Mds />
            </div>
        </div>

        <div id="center" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'99%'}}>
                <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                碳排放流动地图
                </h3>

            </div>
            <div style={{width:'27%',float:'right',border:'none',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderRightColor:'rgba(1,1,1,0.5)'}}>
                <List />
            </div>
            <div  style={{width:'72%',height:'470px',border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',float:'left'}}>
                <Map />
            </div>              
        </div>

         <div id="rightTop"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginRight:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%',float:'left'}}>
                <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                碳排放投入产出
                </h3>

            </div>
     
            <div  style={{width:'99%',height:'100%'}}>
                 <Matrix/> 
            </div>
         
        </div>

        <div id="leftBottom"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',marginRight:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)',borderLeftColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
                <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                碳排放生产组成
                </h3>

            </div>
     
            <div  style={{width:'99%',height:'315px',float:'left'}}>
                <Pie />
            </div>
         
        </div>

    
    

        <div id="centerBottom" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'99%'}}>
                <h3 style={{fontFamily:'微软雅黑',color:"black"}}>
                碳排放消费组成
                </h3>

            </div>
            <div   style={{width:'99%',height:'310px'}}>
                <Bar />
            </div>
        </div>
        {/* <div id="rightBottom" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',
                            borderBottomColor:'rgba(1,1,1,0.5)'}}>

        </div> */}
    </div>
  );
}

export default App;
