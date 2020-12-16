import './App.css';
import './style.css';
import Select from './Select';
import Map from './Map';
import Pie from './Pie';
import List from './list';
import Bar from './Bar';
import Mds from './mds';

function App() {
  return (
    <div className="App" style={{width:"100%",height:'100%'}}>

        <div id="top" style={{border:'dashed',borderWidth:2,marginLeft:'1px',
                            borderColor:'rgba(1,1,1,0.5)'}}>
            <h1 style={{marginTop:'-3px',fontFamily:'微软雅黑',color:"gray"}}>
              碳排放数据可视系统
            </h1>
        </div>

        <div id="left" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',marginRight:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)',borderLeftColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
                碳排放省份选择
            </div>
            <div  style={{width:'99%',height:'277px',border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)'}}>
                <Select />
            </div>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
                碳排放省份关联
            </div>
            <div style={{height:'170px',width:'455px'}}>
                <Mds />
            </div>
        </div>

        <div id="center" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'99%'}}>
                碳排放流动地图
            </div>
            <div style={{width:'195px',float:'right',border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderRightColor:'rgba(1,1,1,0.5)'}}>
                <List />
            </div>
            <div  style={{width:'81%',height:'470px',border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',float:'left'}}>
                <Map />
            </div>              
        </div>

        <div id="leftBottom"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',marginRight:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)',borderLeftColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'98%'}}>
                碳排放生产组成
            </div>
            <div  style={{width:'99%',height:'283px'}}>
                <Pie />
            </div>
        </div>

        <div id="centerBottom" style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,marginLeft:'1px',
                            borderRightColor:'rgba(1,1,1,0.5)',borderBottomColor:'rgba(1,1,1,0.5)'}}>
            <div className="panell-heading"  style={{border:'dashed',borderColor:'rgba(0,0,0,0)',borderWidth:2,
                            borderBottomColor:'rgba(1,1,1,0.5)',width:'99%'}}>
                碳排放消费组成
            </div>
            <div   style={{width:'99%',height:'283px'}}>
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
